from http.server import HTTPServer, SimpleHTTPRequestHandler

if __name__ == '__main__':
    print("Serving on port 8000...")
    HTTPServer(('', 8000), SimpleHTTPRequestHandler).serve_forever()
