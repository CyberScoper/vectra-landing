from playwright.sync_api import sync_playwright
import time

def verify_cursor_interaction():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to localhost:3000...")
            page.goto("http://localhost:3000")

            # Wait for content
            page.wait_for_selector('text="Privacy Without Compromise"', timeout=20000)
            print("Content found")

            # 1. Normal state (Safe spot)
            page.mouse.move(50, 300)
            page.wait_for_timeout(1000)
            page.screenshot(path="verification/cursor_normal.png")
            print("Normal screenshot taken")

            # 2. Hover state
            # Find the "Get Started" button in navbar or CTA
            button = page.locator('text="Get Started"').first
            if button.is_visible():
                box = button.bounding_box()
                x = box['x'] + box['width'] / 2
                y = box['y'] + box['height'] / 2

                print(f"Hovering button at {x}, {y}")
                page.mouse.move(x, y)
                page.wait_for_timeout(1000)
                page.screenshot(path="verification/cursor_hover.png")
                print("Hover screenshot taken")
            else:
                print("Button not found")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_cursor_interaction()
