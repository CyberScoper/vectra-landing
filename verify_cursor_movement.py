import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Navigate to the app
        print("Navigating to http://localhost:3000")
        try:
            await page.goto("http://localhost:3000", timeout=30000)
            await page.wait_for_load_state("networkidle")
        except Exception as e:
            print(f"Error navigating: {e}")
            await browser.close()
            return

        # Select the cursor elements
        # Dot: w-3 h-3
        dot_selector = ".fixed.w-3.h-3.rounded-full"
        # Ring: w-10 h-10
        ring_selector = ".fixed.w-10.h-10.rounded-full"

        try:
            await page.wait_for_selector(dot_selector, timeout=5000)
            await page.wait_for_selector(ring_selector, timeout=5000)
            print("Cursor elements found.")
        except Exception as e:
            print("Cursor elements NOT found. Maybe isHidden is true or device detected as touch?")
            await browser.close()
            return

        # Move mouse to specific coordinates
        target_x, target_y = 500, 300
        print(f"Moving mouse to {target_x}, {target_y}")
        await page.mouse.move(target_x, target_y)

        # Wait for spring animation to settle
        await asyncio.sleep(0.5)

        # Take a screenshot
        await page.screenshot(path="verification/cursor_verification.png")
        print("Screenshot saved to verification/cursor_verification.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
