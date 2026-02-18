from http.server import HTTPServer, SimpleHTTPRequestHandler
import json
import os

class MyHandler(SimpleHTTPRequestHandler):
    def do_POST(self):
        length = int(self.headers.get('Content-Length'))
        data = self.rfile.read(length).decode('utf-8')
        
        # Parse the JSON data
        try:
            json_data = json.loads(data)
        except json.JSONDecodeError:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b"Invalid JSON")
            return

        # Security check: prevent writing outside of current directory
        path = self.path.lstrip('/')
        if '..' in path or path.startswith('/'):
            self.send_response(403)
            self.end_headers()
            self.wfile.write(b"Forbidden")
            return

        # Write to file
        try:
            with open(path, 'w', encoding='utf-8') as f:
                json.dump(json_data, f, indent=4)
            
            self.send_response(200)
            self.end_headers()
            self.wfile.write(b"File saved")
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(str(e).encode('utf-8'))

if __name__ == '__main__':
    server_address = ('', 8000)
    print("Serving on port 8000...")
    httpd = HTTPServer(server_address, MyHandler)
    httpd.serve_forever()
