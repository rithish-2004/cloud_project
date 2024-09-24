from flask import Flask, render_template, request, redirect, url_for
import requests
from collections import Counter

app = Flask(__name__)

def fetch_github_profile(username):
    url = f'https://api.github.com/users/{username}'
    response = requests.get(url)
    return response.json()

def fetch_github_repos(username):
    url = f'https://api.github.com/users/{username}/repos'
    response = requests.get(url)
    return response.json()

def get_language_usage(repos):
    languages = [repo['language'] for repo in repos if repo['language']]
    language_count = Counter(languages)
    total_repos = len(repos)
    return {language: (count / total_repos * 100) for language, count in language_count.items()}

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        username = request.form['username']
        return redirect(url_for('profile', username=username))
    return render_template('index.html')

@app.route('/profile/<username>')
def profile(username):
    profile_data = fetch_github_profile(username)
    repos = fetch_github_repos(username)
    languages = get_language_usage(repos)
    
    print("Languages Data:", languages)  # Debug output
    
    return render_template('profile.html', profile=profile_data, repos=repos, languages=languages)

if __name__ == '__main__':
    app.run(debug=True)
