from flask import Flask, render_template, send_file, request, flash, redirect, url_for
import os
from cv_data import cv_info
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
# Secret key from environment variable or default for local dev
app.secret_key = os.getenv('SECRET_KEY', 'default_secret_key_for_development')

@app.route('/')
def home():
    return render_template('index.html', cv=cv_info)

@app.route('/education')
def education():
    return render_template('education.html', cv=cv_info)

@app.route('/download_cv')
def download_cv():
    # Path to the PDF CV in static/docs
    cv_path = os.path.join(app.root_path, 'static', 'docs', 'khucvvv.pdf')
    if os.path.exists(cv_path):
        return send_file(cv_path, as_attachment=True, download_name="Khushi_CV.pdf")
    else:
        # Fallback to docx if pdf not found (for safety)
        docx_path = os.path.join(app.root_path, 'static', 'docs', 'khushicvvv.docx')
        if os.path.exists(docx_path):
            return send_file(docx_path, as_attachment=True, download_name="Khushi_CV.docx")
        return "CV file not found.", 404

@app.route('/contact', methods=['POST'])
def contact():
    name = request.form.get('name')
    email = request.form.get('email')
    message = request.form.get('message')
    
    # In a real app, you would send an email or save to DB here.
    # For now, we will just print to console and flash a success message.
    print(f"New Contact Message from {name} ({email}): {message}")
    
    flash("Thank you for your message! I will get back to you soon.", "success")
    return redirect(url_for('home') + "#contact")

if __name__ == '__main__':
    # Use app.run() for local development
    app.run(debug=True)
