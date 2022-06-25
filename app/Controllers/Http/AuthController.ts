import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User';

export default class AuthController {
    public async login({ view }: HttpContextContract) {
        return view.render('auth.login');
    }

    public async loginPost({ request, response, session }: HttpContextContract) {
        const user = await User.findBy('kode', request.input('kode'));
        if (user) {
            const expired = new Date().setDate(new Date(user?.created_at).getDate() + parseInt(user.expired))
            if (new Date(expired) < new Date()) {
                session.flash({ error: 'Anda sudah kadaluarsa' })
                return response.redirect('/login');
            } 
            session.put('user', {is_login: true, data: user});
            return response.redirect('/');
        } else {
            session.flash({ error: 'Kode tidak ditemukan' });
            return response.redirect('/login');
        }
    }

    public async logout({ session, response }: HttpContextContract) {
        session.forget('user');
        return response.redirect('/');
    }
}
