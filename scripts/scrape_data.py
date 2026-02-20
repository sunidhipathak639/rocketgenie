import requests
from bs4 import BeautifulSoup
import csv
import time
import os
import json

# --- CONFIGURATION ---
API_KEY = '9b2a44abf2680f12e7bf8d4c5feb002c05d6d08f'
BASE_URL = 'https://rocketgenie.co.in/'
ZENROWS_ENDPOINT = 'https://api.zenrows.com/v1/'
WORKSPACE_DIR = '/Users/rahulraj/Documents/rocketgenie'

def get_html(url):
    """Helper function to fetch HTML via ZenRows"""
    params = {
        'url': url,
        'apikey': API_KEY,
        'mode': 'auto',
    }
    try:
        response = requests.get(ZENROWS_ENDPOINT, params=params)
        if response.status_code == 200:
            return response.text
        else:
            print(f"Error {response.status_code} for {url}")
    except Exception as e:
        print(f"Error fetching {url}: {e}")
    return None

def scrape_rocketgenie():
    print("🚀 Starting Rocket Genie Deep Scrape...")
    home_html = get_html(BASE_URL)
    if not home_html:
        return

    soup = BeautifulSoup(home_html, 'html.parser')
    category_links = []
    
    # Extract categories
    for a in soup.find_all('a', href=True):
        if 'Id=' in a['href']:
            full_link = BASE_URL + a['href'] if not a['href'].startswith('http') else a['href']
            if full_link not in category_links:
                category_links.append(full_link)

    print(f"📂 Found {len(category_links)} categories.")
    
    all_data = []

    for cat_url in category_links:
        print(f"🔍 Scraping category: {cat_url}")
        cat_html = get_html(cat_url)
        if not cat_html:
            continue
        
        cat_soup = BeautifulSoup(cat_html, 'html.parser')
        
        # Extract Category Name
        category_name = "Unknown"
        h2 = cat_soup.find('h2')
        if h2:
            category_name = h2.text.strip()
        
        # Find listings
        # Improved parsing for Rocket Genie sub-pages
        # Based on typical business directory layouts:
        items = cat_soup.find_all('div', class_=lambda x: x and ('service' in x.lower() or 'listing' in x.lower() or 'item' in x.lower()))
        
        if not items:
            items = cat_soup.find_all('div', class_='row') # Some sites use grid rows
        
        for item in items:
            h3 = item.find('h3')
            if not h3: continue
            
            name = h3.text.strip()
            if name in [d['name'] for d in all_data]: continue # Avoid duplicates within same category
            
            text_content = item.get_text(separator='|')
            parts = [p.strip() for p in text_content.split('|') if p.strip()]
            
            phone = "N/A"
            address = "N/A"
            
            # Look for phone/address in sibling or child elements
            for p in parts:
                p_clean = ''.join(c for c in p if c.isdigit() or c == '+')
                if len(p_clean) >= 10:
                    phone = p
                elif len(p) > 15 and any(k in p.lower() for k in ['india', 'st', 'rd', 'floor', 'opp', 'near', 'building']):
                    address = p

            all_data.append({
                'category': category_name,
                'name': name,
                'phone': phone,
                'address': address
            })
        
        time.sleep(1)

    # Save to JSON for easier migration
    output_path = os.path.join(WORKSPACE_DIR, 'scraped_data.json')
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_data, f, indent=2)
    
    print(f"✅ Scrape complete. Saved {len(all_data)} items to {output_path}")

if __name__ == "__main__":
    scrape_rocketgenie()
