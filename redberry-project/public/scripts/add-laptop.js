document.querySelector('.laptop_name').value = localStorage.getItem(`laptop_name`);
document.querySelector('.brand').value = localStorage.getItem(`brand`);
document.querySelector('.cpu').value = localStorage.getItem(`cpu`);
document.querySelector('.cpu_core').value = localStorage.getItem(`cpu_core`);
document.querySelector('.cpu_thread').value = localStorage.getItem(`cpu_thread`);
document.querySelector('.ram').value = localStorage.getItem(`ram`);
document.querySelector('.purchase_date').value = localStorage.getItem(`purchase_date`);
document.querySelector('.price').value = localStorage.getItem(`price`);

if (localStorage.getItem(`state`) === 'new') {
    document.getElementById('new').checked = true
};
if (localStorage.getItem(`state`) === 'used') {
    document.getElementById('old').checked = true
};
if (localStorage.getItem(`storage`) === 'SSD') {
    document.getElementById('ssd').checked = true
};
if (localStorage.getItem(`storage`) === 'HDD') {
    document.getElementById('hdd').checked = true
};


document.querySelector('.hidden_first_name').value = localStorage.getItem(`first_name`);
document.querySelector('.hidden_last_name').value = localStorage.getItem(`last_name`);
document.querySelector('.hidden_team').value = localStorage.getItem(`team`);
document.querySelector('.hidden_position').value = localStorage.getItem(`position`);
document.querySelector('.hidden_mail').value = localStorage.getItem(`mail`);
document.querySelector('.hidden_number').value = localStorage.getItem(`number`);


const brands_table = document.querySelector('.brand');

fetch('https://pcfy.redberryinternship.ge/api/brands')
    .then((response) => response.json())
    .then((brands) => {
        brands.data.forEach(brand => {
            const select_brand = document.createElement("option")

            select_brand.value = brand.name
            select_brand.appendChild(
                document.createTextNode(
                    `${brand.name}`
                )
            );
            if (localStorage.getItem('brand') === `${brand.name}`) {
                select_brand.selected = true
            }
            brands_table.appendChild(select_brand)
        });

    });

const cpus_table = document.querySelector('.cpu');

fetch('https://pcfy.redberryinternship.ge/api/cpus')
    .then((response) => response.json())
    .then((cpus) => {
        cpus.data.forEach(cpu => {
            const select_cpu = document.createElement("option")

            select_cpu.value = cpu.name
            select_cpu.appendChild(
                document.createTextNode(
                    `${cpu.name}`
                )
            );

            if (localStorage.getItem('cpu') === `${cpu.name}`) {
                select_cpu.selected = true
            }

            cpus_table.appendChild(select_cpu)
        });

    });

const saveInLocalStorage = (key, value) => {
    localStorage.setItem(key, value)
};