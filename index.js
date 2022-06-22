const database = require('./src/config/database');

const User = require('./src/models/User');
const SystemRole = require('./src/models/SystemRole');
const GeneralPermission = require('./src/models/GeneralPermission');

const syncdb = async () => {
    try {
        const res = await database.sync();
    } catch (error) {
        console.log(error);
    }
};

const createSomeData = async () => {
    try {
        const systemRole = await SystemRole.create({
            name: 'Criador de conteúdo',
        })
    
        const user = await User.create({
            name: 'Cristian',
            email: 'cristian@teste.com',
            password: 'teste',
            role_id: 1
        })
        
        const generalPermission = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 1
        })
    } catch (error) {
        console.log(error)
    }
};

// syncdb()
// createSomeData()
