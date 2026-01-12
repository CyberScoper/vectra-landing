from playwright.sync_api import sync_playwright

def verify_cursor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Wait for loading to finish (CustomCursor is rendered after loading)
        page.wait_for_timeout(5000)

        # Move mouse to trigger cursor
        page.mouse.move(500, 500)

        # Take screenshot
        page.screenshot(path="verification/cursor.png")
        browser.close()

if __name__ == "__main__":
    verify_cursor()
