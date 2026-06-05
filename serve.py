import os, sys
from http.server import HTTPServer, SimpleHTTPRequestHandler

ROOT = os.path.dirname(os.path.abspath(__file__))
os.chdir(ROOT)
port = int(sys.argv[1]) if len(sys.argv) > 1 else 4178
HTTPServer(("127.0.0.1", port), SimpleHTTPRequestHandler).serve_forever()
