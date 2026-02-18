from flask import Flask, jsonify, request, send_from_directory, make_response
from flask_cors import CORS
import requests
from datetime import datetime
import os

app = Flask(__name__, static_folder='.', static_url_path='', template_folder='.')
CORS(app)

# Add cache busting headers
@app.after_request
def add_header(response):
    response.cache_control.max_age = 0
    response.cache_control.no_cache = True
    response.cache_control.no_store = True
    response.cache_control.must_revalidate = True
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    return response

GITHUB_API_URL = 'https://api.github.com/users/atik806/repos'
GITHUB_TOKEN = os.getenv('GITHUB_TOKEN', '')

headers = {}
if GITHUB_TOKEN:
    headers['Authorization'] = f'token {GITHUB_TOKEN}'

@app.route('/')
def index():
    """Serve the main portfolio page"""
    return send_from_directory('.', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files (CSS, JS, etc)"""
    try:
        return send_from_directory('.', filename)
    except:
        return send_from_directory('.', 'index.html')

@app.route('/api/projects', methods=['GET'])
def get_projects():
    """Fetch and cache GitHub projects"""
    try:
        response = requests.get(GITHUB_API_URL, headers=headers, params={'per_page': 100})
        response.raise_for_status()
        
        projects = response.json()
        
        # Filter out forks and add metadata
        projects = [p for p in projects if not p.get('fork', False)]
        
        # Enhance project data
        for project in projects:
            project['metadata'] = {
                'language': project.get('language', 'Unknown'),
                'stars': project.get('stargazers_count', 0),
                'forks': project.get('forks_count', 0),
                'watchers': project.get('watchers_count', 0),
                'updated': project.get('updated_at'),
                'created': project.get('created_at'),
                'topics': project.get('topics', []),
                'size': project.get('size', 0),
            }
        
        return jsonify({
            'success': True,
            'count': len(projects),
            'projects': projects
        })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/projects/search', methods=['GET'])
def search_projects():
    """Search projects by query"""
    query = request.args.get('q', '').lower()
    language = request.args.get('language', '').lower()
    sort_by = request.args.get('sort', 'updated')
    
    try:
        response = requests.get(GITHUB_API_URL, headers=headers, params={'per_page': 100})
        response.raise_for_status()
        
        projects = response.json()
        projects = [p for p in projects if not p.get('fork', False)]
        
        # Filter by search query
        if query:
            projects = [p for p in projects if 
                       query in p.get('name', '').lower() or 
                       query in (p.get('description') or '').lower()]
        
        # Filter by language
        if language:
            projects = [p for p in projects if 
                       p.get('language', '').lower() == language]
        
        # Sort
        if sort_by == 'stars':
            projects.sort(key=lambda x: x.get('stargazers_count', 0), reverse=True)
        elif sort_by == 'forks':
            projects.sort(key=lambda x: x.get('forks_count', 0), reverse=True)
        else:  # updated
            projects.sort(key=lambda x: x.get('updated_at', ''), reverse=True)
        
        return jsonify({
            'success': True,
            'count': len(projects),
            'projects': projects
        })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/projects/languages', methods=['GET'])
def get_languages():
    """Get all unique languages used"""
    try:
        response = requests.get(GITHUB_API_URL, headers=headers, params={'per_page': 100})
        response.raise_for_status()
        
        projects = response.json()
        projects = [p for p in projects if not p.get('fork', False)]
        
        languages = {}
        for project in projects:
            lang = project.get('language', 'Unknown')
            if lang:
                languages[lang] = languages.get(lang, 0) + 1
        
        return jsonify({
            'success': True,
            'languages': sorted(languages.items(), key=lambda x: x[1], reverse=True)
        })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/projects/stats', methods=['GET'])
def get_stats():
    """Get portfolio statistics"""
    try:
        response = requests.get(GITHUB_API_URL, headers=headers, params={'per_page': 100})
        response.raise_for_status()
        
        projects = response.json()
        projects = [p for p in projects if not p.get('fork', False)]
        
        total_stars = sum(p.get('stargazers_count', 0) for p in projects)
        total_forks = sum(p.get('forks_count', 0) for p in projects)
        total_watchers = sum(p.get('watchers_count', 0) for p in projects)
        languages = len(set(p.get('language') for p in projects if p.get('language')))
        
        return jsonify({
            'success': True,
            'stats': {
                'total_projects': len(projects),
                'total_stars': total_stars,
                'total_forks': total_forks,
                'total_watchers': total_watchers,
                'languages_used': languages,
                'avg_stars': round(total_stars / len(projects), 2) if projects else 0
            }
        })
    
    except requests.exceptions.RequestException as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
