from bs4 import BeautifulSoup
from pyppeteer import launch
from config import LINKEDIN_EMAIL, LINKEDIN_PWD
import requests


async def loginLinkedIn(page):
    await page.goto("https://www.linkedin.com/login")

    await page.click("#username")
    await page.keyboard.type(LINKEDIN_EMAIL)

    await page.click("#password")
    await page.keyboard.type(LINKEDIN_PWD)

    await page.click("button[type=submit]")

    await page.waitForNavigation()

    # skipBtn = await page.Jx('//button[text()="Skip"]')
    # await page.click(skipBtn)


async def scrapeLinkedIn(job_url):
    # for testing purposes, don't use headless
    browser = await launch(
        {
            "headless": False,
            "slowMo": 10,
            "devtools": True,
        }
    )

    page = await browser.newPage()

    await loginLinkedIn(page)
    await page.waitFor(10)
    await page.goto(job_url)

    # rather than screenshotting, let's select html elements and extract:
    # job position, job details, company name
    await page.screenshot({"path": "screenshot.png"})

    await browser.close()
