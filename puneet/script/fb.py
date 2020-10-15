from selenium import webdriver
import time
def login():
    browser=webdriver.Chrome('C:/Users/Puneet/Downloads/chromedriver.exe')
    browser.get('https://facebook.com')
    time.sleep(5)
    user=browser.find_element_by_css_selector('#email')
    user.send_keys('ulluidiot2310@gmail.com')
    password=browser.find_element_by_css_selector('#pass')
    password.send_keys('puneet049')
    login=browser.find_element_by_css_selector('#u_0_5') 
    login.click()




	
