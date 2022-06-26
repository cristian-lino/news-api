const database = require('./config/database');
const auth =  require('./services/auth')

const User = require('./models/User');
const SystemRole = require('./models/SystemRole');
const GeneralPermission = require('./models/GeneralPermission');
const Channel = require('./models/Channel');
const ChannelUserLikes = require('./models/ChannelUserLikes');
const News = require('./models/News');

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
            name: 'Administrador',
        })
        const systemRole2 = await SystemRole.create({
            name: 'Usuário comum',
        })
        const systemRole3 = await SystemRole.create({
            name: 'Criador de conteúdo',
        })
        
    
        const user = await User.create({
            name: 'Admin',
            email: 'admin@admin.com',
            password: auth.createPasswordHash('admin'),
            role_id: 1
        })
        
        const homePermission1 = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 1
        })
        const homePermission2 = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: false,
            allow_edit: false,
            allow_delete: false,
            role_id: 2
        })
        const homePermission3 = await GeneralPermission.create({
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 3
        })
        
        const channelPermission1 = await GeneralPermission.create({
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 1
        })
        const channelPermission2 = await GeneralPermission.create({
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: false,
            allow_edit: false,
            allow_delete: false,
            role_id: 2
        })
        const channelPermission3 = await GeneralPermission.create({
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 3
        })
        const generalPermission5 = await GeneralPermission.create({
            screen: 'USER_MANAGEMENT',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 1
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