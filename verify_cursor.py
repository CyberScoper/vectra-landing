from playwright.sync_api import sync_playwright
import time
import os

def run():
    print("Starting verification...")
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page()
        try:
            print("Navigating to page...")
            page.goto("http://localhost:5173", timeout=30000)
            page.wait_for_selector("nav", state="visible")
            print("Page loaded.")

            # Center cursor
            page.mouse.move(500, 500)
            time.sleep(1)
            page.screenshot(path="cursor_center.png")
            print("Captured cursor_center.png")

            # Hover
            link = page.get_by_text("Get Started").first
            if link.is_visible():
                box = link.bounding_box()
                if box:
                    page.mouse.move(box['x'] + box['width'] / 2, box['y'] + box['height'] / 2)
                    time.sleep(1)
                    page.screenshot(path="cursor_hover.png")
                    print("Captured cursor_hover.png")
            else:
                print("Link not found")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
