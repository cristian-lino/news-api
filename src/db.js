const database = require('./database/index');
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
            id: 1,
            name: 'Administrador'
        })
        const systemRole2 = await SystemRole.create({
            id: 2,
            name: 'Usuário comum'
        })
        const systemRole3 = await SystemRole.create({
            id: 3,
            name: 'Criador de conteúdo'
        })
        
    
        const user = await User.create({
            id: 1,
            name: 'Admin',
            email: 'admin@admin.com',
            password: auth.createPasswordHash('admin'),
            role_id: 1
        })
        
        const homePermission1 = await GeneralPermission.create({
            id: 1,
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 1
        })
        const homePermission2 = await GeneralPermission.create({
            id: 2,
            screen: 'HOME',
            allow_read: true,
            allow_create: false,
            allow_edit: false,
            allow_delete: false,
            role_id: 2
        })
        const homePermission3 = await GeneralPermission.create({
            id: 3,
            screen: 'HOME',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 3
        })
        
        const channelPermission1 = await GeneralPermission.create({
            id: 4,
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: true,
            allow_edit: true,
            allow_delete: true,
            role_id: 1
        })
        const channelPermission2 = await GeneralPermission.create({
            id: 5,
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: false,
            allow_edit: false,
            allow_delete: false,
            role_id: 2
        })
        const channelPermission3 = await GeneralPermission.create({
            id: 6,
            screen: 'CHANNEL',
            allow_read: true,
            allow_create: true,
            allow_edit: false,
            allow_delete: false,
            role_id: 3
        })
        const generalPermission5 = await GeneralPermission.create({
            id: 7,
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