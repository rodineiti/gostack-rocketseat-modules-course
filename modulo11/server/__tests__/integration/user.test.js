import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../src/app';
import truncate from '../utils/truncate';
import factory from '../factories';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('verificar se a senha eh criptografada e gerada um novo hash', async () => {
    const user = await factory.create('User', {
      password: '123456', // fixa somente a senha, os outros dados serão da faker - override
    });

    const compare = await bcrypt.compare('123456', user.password_hash);

    expect(compare).toBe(true);
  });

  it('deve ser possivel se cadastrar, retornando a propriedade ID', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.body).toHaveProperty('id');
  });

  it('não deve ser registrar com email duplicado', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/users')
      .send(user);

    const response = await request(app)
      .post('/users')
      .send(user);

    expect(response.status).toBe(400);
  });
});
