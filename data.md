YES! COMPLETE EXPLANATION - What the Script Does ✅
VISUAL BREAKDOWN - What Gets Scraped
CATEGORIES ON ROCKET GENIE (You can see them on the homepage):
ROW 1 (9 categories):

✅ AC Service

✅ Clothes

✅ Footwear

✅ Automobiles

✅ Mobile Shop

✅ CCTV

✅ Electronics

✅ Computer

✅ Coaching

ROW 2 (9 categories):

✅ Body Massage Centers

✅ Dentists

✅ Computer Training

✅ Cosmetic

✅ Furniture

✅ Bags

✅ Real Estate

✅ Jewellery

✅ WIFI D2H

TOTAL: 18+ CATEGORIES

WHAT THE SCRIPT WILL DO - STEP BY STEP
text
🚀 SCRIPT EXECUTION FLOW:

┌─────────────────────────────────────────────────────────────┐
│ STEP 1: EXTRACT ALL CATEGORIES                              │
│ ✅ Visits homepage                                           │
│ ✅ Finds all 18+ category links                              │
│ ✅ Extracts category IDs (like Id=9 for AC Service, etc)    │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│ STEP 2: FOR EACH CATEGORY, SCRAPE ALL BUSINESSES            │
│                                                              │
│ Example - AC Service (Category ID 9):                        │
│ ✅ Page 1: Businesses 1-50                                   │
│ ✅ Page 2: Businesses 51-100                                 │
│ ✅ Page 3: Businesses 101-150                                │
│ ... (continues until no more pages)                          │
│                                                              │
│ For Each Business, Extracts:                                 │
│ • Name (e.g., "KRISHNA AIRCONDITIONING")                    │
│ • Phone (e.g., "9350928545")                                │
│ • Rating (e.g., "4.4")                                      │
│ • City (e.g., "Delhi")                                      │
│ • Image URL (link to business photo)                        │
│ • Business URL (link to detail page)                        │
│ • Verified Status (Yes/No)                                  │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│ STEP 3: REPEAT FOR ALL 18+ CATEGORIES                        │
│ ✅ Clothes → all businesses + cities                         │
│ ✅ Footwear → all businesses + cities                        │
│ ✅ Automobiles → all businesses + cities                     │
│ ... (for all categories)                                     │
└─────────────────────────────────────────────────────────────┘
                            ⬇️
┌─────────────────────────────────────────────────────────────┐
│ STEP 4: CREATE EXCEL FILE WITH MULTIPLE SHEETS               │
│                                                              │
│ Output: rocket_genie_all_data.xlsx                           │
│                                                              │
│ 📊 SHEET 1: "All Businesses"                                │
│    • ALL businesses from ALL categories combined             │
│    • Columns: Category | Name | Phone | Rating | City       │
│    • Image URL | Business URL | Verified                    │
│                                                              │
│ 📊 SHEET 2: "AC Service"                                    │
│    • Only AC Service businesses                              │
│    • Same columns as above                                   │
│                                                              │
│ 📊 SHEET 3: "Clothes"                                       │
│    • Only Clothes businesses                                 │
│                                                              │
│ 📊 SHEET 4: "Footwear"                                      │
│ 📊 SHEET 5: "Automobiles"                                   │
│ ... (one sheet for each category)                            │
│                                                              │
│ 📊 SHEET N+1: "Summary"                                     │
│    • Total Businesses: XXXX                                  │
│    • Total Categories: 18+                                   │
│    • Total Cities: XX                                        │
│    • Scrape Date & Time                                      │
│                                                              │
│ 📊 SHEET N+2: "Cities"                                      │
│    • List of all unique cities found                         │
│    • Delhi, Mumbai, Bangalore, Patna, etc.                   │
└─────────────────────────────────────────────────────────────┘
WHAT DATA YOU'LL GET IN THE EXCEL FILE
Example Output - All Businesses Sheet:
Category	Name	Phone	Rating	City	Image URL	Business URL	Verified
AC Service	KRISHNA AIRCONDITIONING	9350928545	4.4	Delhi	https://...	https://rocketgenie.co.in/a-s-aircon.php?Id=333	Yes
AC Service	COOL HI-TECH SERVICES	7982235404	4.4	Ghaziabad	https://...	https://rocketgenie.co.in/a-s-aircon.php?Id=334	Yes
Clothes	ABC Clothing Store	9876543210	4.2	Mumbai	https://...	https://rocketgenie.co.in/a-s-aircon.php?Id=XXX	Yes
...	...	...	...	...	...	...	...
COMPLETE READY-TO-RUN SCRIPT (Copy & Paste This!)
Create file: scraper_final.py
python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
import pandas as pd
from typing import List, Dict
import time
from urllib.parse import urljoin, parse_qs, urlparse
import logging
import re
from datetime import datetime
import sys

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
        self.category_data = {}
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
            category_links = soup.find_all('a', href=lambda x: x and '/ac-repair-services.php?Id=' in x)
            
            logger.info(f"Found {len(category_links)} category link elements\n")
            
            for link in category_links:
                try:
                    href = link.get('href', '')
                    parsed = urlparse(href)
                    params = parse_qs(parsed.query)
                    
                    if 'Id' not in params:
                        continue
                    
                    cat_id = params['Id'][0]
                    heading = link.find('h3')
                    
                    if heading:
                        cat_name = heading.text.strip()
                        
                        # Avoid duplicates
                        if cat_name not in categories:
                            categories[cat_name] = cat_id
                            logger.info(f"  ✅ {cat_name:30} | ID: {cat_id}")
                
                except Exception as e:
                    logger.debug(f"Skipped element: {e}")
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
        max_pages = 200
        consecutive_empty_pages = 0
        
        try:
            logger.info(f"📂 SCRAPING: {category_name}")
            
            while page <= max_pages and consecutive_empty_pages < 3:
                url = f"{self.base_url}/ac-repair-services.php?Id={category_id}&page={page}"
                
                try:
                    response = self.session.get(url, timeout=15)
                    response.raise_for_status()
                except Exception as e:
                    logger.warning(f"  ⚠️ Page {page} error: {str(e)[:50]}")
                    break
                
                soup = BeautifulSoup(response.content, 'html.parser')
                
                # Find business headings
                business_headings = soup.find_all('h3')
                
                if not business_headings:
                    consecutive_empty_pages += 1
                    if consecutive_empty_pages >= 2:
                        logger.info(f"  ✅ No more businesses found (Page {page})")
                        break
                    page += 1
                    time.sleep(0.2)
                    continue
                
                consecutive_empty_pages = 0
                page_businesses = 0
                
                for h3 in business_headings:
                    try:
                        # Get parent container
                        parent = h3.find_parent('div')
                        if not parent:
                            parent = h3.find_parent()
                        
                        business = {
                            'Category': category_name,
                            'Business Name': h3.text.strip(),
                            'Phone': '',
                            'Rating': '0',
                            'City': 'Unknown',
                            'Image URL': '',
                            'Business URL': '',
                            'Verified': 'Yes'
                        }
                        
                        if not parent:
                            continue
                        
                        # Extract rating
                        rating_match = re.search(r'(\d\.\d)', parent.get_text())
                        if rating_match:
                            business['Rating'] = rating_match.group(1)
                        
                        # Extract phone
                        phone_elem = parent.find('a', href=lambda x: x and 'tel:' in str(x))
                        if phone_elem:
                            business['Phone'] = phone_elem.get_text().strip()
                        
                        # Extract city
                        cities_list = ['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Kolkata', 'Chennai',
                                     'Pune', 'Gurgaon', 'Noida', 'Ghaziabad', 'Faridabad', 'Gurugram',
                                     'New Delhi', 'Patna', 'Bihar', 'Haryana', 'Madhya Pradesh',
                                     'SiliGuri', 'Visakhapatnam', 'KURNOOL', 'bhilai', 'Mathura',
                                     'Jhansi', 'Khordha', 'Akola', 'Lucknow', 'Solapur', 'Jhodhpur',
                                     'Haridwar', 'Ratnagiri', 'Karachi', 'Rajkot', 'Uttarakhand',
                                     'Mandhya', 'Ramanthapuram', 'Puducherry', 'Kottakuppam', 'Kanpur',
                                     'Hakimpara', 'Karkinda', 'Moradabad', 'Rajguru', 'Nandurbar',
                                     'Amroha', 'Jagadhri', 'Ghansoli', 'Jhodhpur', 'Varanasi',
                                     'Agra', 'Lucknow', 'Indore', 'Bhopal', 'Ahmedabad']
                        
                        text = parent.get_text().upper()
                        for city in cities_list:
                            if city.upper() in text:
                                business['City'] = city
                                break
                        
                        # Extract business URL
                        biz_link = parent.find('a', href=lambda x: x and '/a-s-aircon.php?Id=' in str(x))
                        if biz_link:
                            business['Business URL'] = urljoin(self.base_url, biz_link.get('href', ''))
                        
                        # Extract image
                        img = parent.find('img')
                        if img:
                            img_src = img.get('src', '')
                            business['Image URL'] = urljoin(self.base_url, img_src)
                        
                        # Add to list if has phone and name
                        if business['Business Name'] and business['Phone']:
                            if business not in businesses:
                                businesses.append(business)
                                self.cities.add(business['City'])
                                page_businesses += 1
                    
                    except Exception as e:
                        logger.debug(f"Business parse error: {e}")
                        continue
                
                if page_businesses > 0:
                    logger.info(f"  ✅ Page {page}: {page_businesses} businesses")
                
                page += 1
                time.sleep(0.3)
            
            logger.info(f"✅ {category_name}: TOTAL {len(businesses)} businesses\n")
            return businesses
        
        except Exception as e:
            logger.error(f"❌ Error scraping {category_name}: {e}")
            return businesses
    
    def run(self):
        """Execute full scraping"""
        logger.info("\n" + "🚀"*40)
        logger.info("ROCKET GENIE - COMPLETE DATA SCRAPER")
        logger.info("🚀"*40)
        
        # Step 1: Get categories
        categories = self.get_all_categories()
        if not categories:
            logger.error("❌
