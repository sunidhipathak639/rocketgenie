#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
import json
from typing import List, Dict
import time
from urllib.parse import urljoin, parse_qs, urlparse
import logging
import re
import os

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class RocketGenieScraper:
    def __init__(self):
        self.base_url = "https://rocketgenie.co.in"
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
        self.all_businesses = []
        self.cities = set()
        
    def get_all_categories(self) -> Dict[str, str]:
        """Get all categories from homepage"""
        try:
            logger.info("\n" + "="*80)
            logger.info("STEP 1: FETCHING ALL CATEGORIES FROM HOMEPAGE")
            logger.info("="*80)
            
            response = self.session.get(f"{self.base_url}/index.php", timeout=15)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            categories = {}
            
            # Find all category links
            category_links = soup.find_all('a', href=lambda x: x and 'Id=' in x)
            
            logger.info(f"Found {len(category_links)} link elements\n")
            
            for link in category_links:
                try:
                    href = link.get('href', '')
                    parsed = urlparse(href)
                    params = parse_qs(parsed.query)
                    
                    if 'Id' not in params:
                        continue
                    
                    cat_id = params['Id'][0]
                    # Try to find the name in the text or a heading inside
                    cat_name = link.text.strip()
                    if not cat_name:
                        heading = link.find(['h3', 'h4', 'span'])
                        if heading:
                            cat_name = heading.text.strip()
                    
                    if cat_name and len(cat_name) > 2:
                        # Avoid duplicates
                        if cat_name not in categories:
                            categories[cat_name] = cat_id
                            logger.info(f"  ✅ {cat_name:30} | ID: {cat_id}")
                
                except Exception as e:
                    continue
            
            logger.info(f"\n✅ TOTAL CATEGORIES FOUND: {len(categories)}\n")
            return dict(sorted(categories.items()))
        
        except Exception as e:
            logger.error(f"❌ Error fetching categories: {e}")
            return {}
    
    def scrape_category(self, category_name: str, category_id: str) -> List[Dict]:
        """Scrape all businesses from one category"""
        businesses = []
        page = 1
        max_pages = 50 # Increased for fuller scrape
        consecutive_empty_pages = 0
        
        try:
            logger.info(f"📂 SCRAPING: {category_name}")
            
            while page <= max_pages and consecutive_empty_pages < 2:
                url = f"{self.base_url}/ac-repair-services.php?Id={category_id}&page={page}"
                
                try:
                    response = self.session.get(url, timeout=15)
                    response.raise_for_status()
                except Exception as e:
                    logger.warning(f"  ⚠️ Page {page} error: {str(e)[:50]}")
                    break
                
                soup = BeautifulSoup(response.content, 'html.parser')
                business_headings = soup.find_all('h3')
                
                if not business_headings:
                    business_headings = soup.find_all('div', class_='service-box')
                
                if not business_headings:
                    consecutive_empty_pages += 1
                    page += 1
                    continue
                
                consecutive_empty_pages = 0
                page_businesses = 0
                
                for item in business_headings:
                    try:
                        name = item.text.strip()
                        if not name or len(name) < 2: continue
                        
                        parent = item.find_parent('div')
                        if not parent: parent = item.find_parent()
                        
                        business = {
                            'category': category_name,
                            'name': name,
                            'phone': 'N/A',
                            'rating': '4.5',
                            'city': 'General',
                            'address': 'N/A'
                        }
                        
                        phone_elem = parent.find('a', href=lambda x: x and 'tel:' in str(x))
                        if phone_elem:
                            business['phone'] = phone_elem.get('href').replace('tel:', '').strip()
                        
                        cities_list = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai', 'Pune', 'Gurgaon', 'Noida', 'Ghaziabad', 'Patna', 'Lucknow', 'Ahmedabad', 'Jaipur']
                        parent_text = parent.get_text() if parent else ""
                        for c in cities_list:
                            if c.lower() in parent_text.lower():
                                business['city'] = c
                                break
                        
                        if business not in businesses:
                            businesses.append(business)
                            page_businesses += 1
                    
                    except Exception as e:
                        continue
                
                if page_businesses == 0:
                    consecutive_empty_pages += 1
                else:
                    logger.info(f"  ✅ Page {page}: {page_businesses} businesses")
                    consecutive_empty_pages = 0
                
                page += 1
                time.sleep(0.3)
            
            return businesses
        
        except Exception as e:
            logger.error(f"❌ Error scraping {category_name}: {e}")
            return businesses
    
    def run(self):
        categories = self.get_all_categories()
        if not categories:
            return
            
        for name, cat_id in categories.items():
            try:
                results = self.scrape_category(name, cat_id)
                self.all_businesses.extend(results)
            except Exception as e:
                logger.error(f"⚠️ Failed category {name}: {e}")
                continue
            
        # Save to JSON
        with open('scraped_data_full.json', 'w', encoding='utf-8') as f:
            json.dump(self.all_businesses, f, indent=2)
            
        logger.info(f"✅ Scraping complete. Total items: {len(self.all_businesses)}")

if __name__ == "__main__":
    scraper = RocketGenieScraper()
    scraper.run()
