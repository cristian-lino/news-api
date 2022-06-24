const database = require('./config/database');
const auth =  require('./services/auth')

const User = require('./models/User');
const SystemRole = require('./models/SystemRole');
const GeneralPermission = require('./models/GeneralPermission');

const syncdb = async () => {
    try {
        const res = await database.sync();
    } catch (error) {
        console.log(error);
    }
};

const createSomeData = async () => {
    try {
        const systemRole1 = await SystemRole.create({
            name: 'Criador de conteúdo',
        })
        const systemRole2 = await SystemRole.create({
            name: 'Administrador',
        })
    
        const user1 = await User.create({
            name: 'Cristian',
            email: 'cristian@teste.com',
            password: auth.createPasswordHash('teste'),
            role_id: 1
        })
        
        const generalPermission1 = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 1
        })
        const generalPermission2 = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 2
        })
    } catch (error) {
        console.log(error)
    }
};

const init = async () => {
    await syncdb()
    await createSomeData()
}

init()