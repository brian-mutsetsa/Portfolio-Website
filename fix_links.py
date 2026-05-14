import re

def fix_links(filepath, depth):
    with open(filepath, 'r') as f:
        content = f.read()
    
    prefix = '../' * depth if depth > 0 else './'
    
    # href="/" -> href="./index.html" or "../index.html"
    content = re.sub(r'href="/"', f'href="{prefix}index.html"', content)
    
    # href="/file.html" -> href="./file.html" or "../file.html"
    content = re.sub(r'href="/([^"]+\.html[^"]*)"', f'href="{prefix}\1"', content)
    
    # href="/Brian..." -> href="./Brian..." or "../Brian..."
    content = re.sub(r'href="/(Brian[^"]+\.pdf)"', f'href="{prefix}\1"', content)

    with open(filepath, 'w') as f:
        f.write(content)

fix_links('index.html', 0)
fix_links('robotics.html', 0)
fix_links('software.html', 0)
fix_links('projects/employee-management.html', 1)
