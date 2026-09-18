const usersTable = document.getElementById('usersTable');
const message = document.getElementById('message');

const getUsers = async () => {

    const response = await fetch('/users');

    const users = await response.json();

    if (!response.ok) {
        message.textContent = "Failed to get users";
        return;
    }

    users.forEach(user => {

        const row = document.createElement('tr');

        row.innerHTML = `
            <td class="p-3 text-center">${user.id}</td>
            <td class="p-3 text-center">${user.firstName}</td>
            <td class="p-3 text-center">${user.lastName}</td>
            <td class="p-3 text-center">${user.age}</td>
            <td class="p-3 text-center">
                <button onclick="deleteUser(${user.id})" class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg">Delete</button>
                <button onclick="updateUser(${user.id})" class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-lg">Update</button>
            </td>`;

        usersTable.appendChild(row);
    });
};


const deleteUser = async (id) => {

    const response = await fetch(`/user/${id}`, {
        method: 'DELETE'
    });

    const result = await response.json();

    if (!response.ok) {
        message.textContent = result.message;
        return;
    }

    message.textContent = result.message;

    usersTable.innerHTML = '';

    getUsers();
};

{
      const form = document.getElementById('createForm');
      if(form){

        form.addEventListener('submit', async (event) => {

            event.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const age = document.getElementById('age').value;

            const response = await fetch('/user', {

                method: 'POST',

                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    age: age
                })

            });

            const result = await response.json();

            document.getElementById('message').textContent = result.message;

        });

}}
window.addEventListener('load', () => {
    getUsers();
});