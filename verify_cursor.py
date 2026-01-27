from playwright.sync_api import sync_playwright
import time

def verify_cursor():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:5173")

        # Wait for loading screen to finish and nav to appear
        print("Waiting for nav...")
        page.wait_for_selector("nav", timeout=10000)
        print("Nav found.")

        # Move mouse to center
        # The custom cursor follows the mouse.
        # We move the mouse and wait a bit for the spring animation.
        page.mouse.move(500, 500)
        time.sleep(1)

        # Screenshot
        page.screenshot(path="verification.png")
        print("Screenshot taken.")
        browser.close()

if __name__ == "__main__":
    verify_cursor()
