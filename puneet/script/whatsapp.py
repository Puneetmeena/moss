from selenium import webdriver

browser = webdriver.Chrome('C:/Users/Puneet/Downloads/chromedriver.exe')
browser.get('https://web.whatsapp.com/')


while(1):
    
    name = input('enter the name of contact')
    msg = input('enter your msg')
    count = int(input('enter the count :'))

    input('enter space after scanning QR code')

    user = browser.find_element_by_xpath('//span[@title = "{}"]'.format(name))
    user.click()

    msg_box = browser.find_element_by_class_name('input-container')
    for i in range(count):
        
        msg_box.send_keys(msg)
        button = browser.find_element_by_class_name('compose-btn-send')
        button.click()
    ch = input('enter 0 for stop')
    if ch==0:
        break
        
