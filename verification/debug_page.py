from playwright.sync_api import sync_playwright

def check_page():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")
        page.screenshot(path="verification/debug_page.png")
        print(page.title())
        browser.close()

if __name__ == "__main__":
    check_page()
