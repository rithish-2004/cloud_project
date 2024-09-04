from flask import Flask, render_template
import requests

app = Flask(__name__)

@app.route('/')
def linkedin_profile():
    api_endpoint = 'https://nubela.co/proxycurl/api/v2/linkedin'
    linkedin_profile_url = 'https://www.linkedin.com/in/kesavan-d-44921a256/'
    api_key = '3WBr5NHZEh7YdVTTKuNXcQ'
    headers = {'Authorization': 'Bearer ' + api_key}

    response = requests.get(api_endpoint,
                            params={'url': linkedin_profile_url, 'skills': 'include'},
                            headers=headers)

    profile_data = response.json()

    return render_template('profile.html', profile_data=profile_data)

if __name__ == '__main__':
    app.run(debug=True)
