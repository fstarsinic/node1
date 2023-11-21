import requests


class Colors:
    RESET = "\033[0m"  # Reset all formatting
    RED = "\033[91m"   # Red text
    GREEN = "\033[92m" # Green text
    YELLOW = "\033[93m"  # Yellow text
    BLUE = "\033[94m"   # Blue text
    MAGENTA = "\033[95m"  # Magenta text
    CYAN = "\033[96m"   # Cyan text
    WHITE = "\033[97m"  # White text


# Specify the file containing URLs
URL_FILE = "curl_list"

# Read URLs from the file
with open(URL_FILE, "r") as file:
    urls = file.read().splitlines()

# Loop through each URL and send a GET request
for url in urls:
    if url:
        try:
            print(f"Testing URL: {url}")
            response = requests.get(url)
            response.raise_for_status()  # Raise an exception for HTTP errors (e.g., 404)
            print(response.text)  # Print the response content
            print(f'{Colors.GREEN}PASS: {Colors.RESET}')
        except requests.exceptions.RequestException as e:
            print(f"{Colors.RED}FAIL: {Colors.RESET}: Failed to fetch URL: {str(e)}")
        print("-------------------------------------")

