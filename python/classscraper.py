import json

with open('input.json', 'r') as file:
    data = json.load(file)

output_data = []

class_counter = 0

for item in data:
    key = item.get('key', 'N/A')

    title = item.get('title', 'N/A')
    instructor = item.get('instr', 'N/A')
    meets = item.get('meets', 'N/A')
    start_date = item.get('start_date', 'N/A')
    end_date = item.get('end_date', 'N/A')
    section = item.get('section', 'N/A')  
    code = item.get('code', 'N/A')  
    
    cart_opts_str = item.get('cart_opts', '{}')  
    cart_opts = json.loads(cart_opts_str)  
    credit_hours = cart_opts.get('credit_hrs', {}).get('options', [{}])[0].get('value', 'N/A')
    
    output_data.append({
        'key': key,
        'title': title,
        'code': code,  
        'instructor': instructor,
        'meets': meets,
        'startDate': start_date,  
        'endDate': end_date,     
        'section': section,  
        'creditHours': credit_hours  
    })

    class_counter += 1

with open('output.json', 'w') as outfile:
    json.dump(output_data, outfile, indent=4)

print(f"Total number of classes: {class_counter}")
