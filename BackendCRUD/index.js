const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:4200" }));

// ------------------- PAISES -------------------
app.get('/paises', async (req, res) => {
  const paises = await prisma.pais.findMany();
  res.json(paises);
});

app.post('/paises', async (req, res) => {
  const { nombre } = req.body;
  const nuevo = await prisma.pais.create({ data: { nombre } });
  res.json(nuevo);
});

app.put('/paises/:id', async (req, res) => {
  const { nombre } = req.body;
  const { id } = req.params;
  const actualizado = await prisma.pais.update({ where: { id: Number(id) }, data: { nombre } });
  res.json(actualizado);
});

app.delete('/paises/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.pais.delete({ where: { id: Number(id) } });
  res.json({ message: 'País eliminado' });
});

// ------------------- DEPARTAMENTOS -------------------
app.get('/departamentos', async (req, res) => {
  const items = await prisma.departamento.findMany();
  res.json(items);
});

app.post('/departamentos', async (req, res) => {
  const { nombre, paisId } = req.body;
  const nuevo = await prisma.departamento.create({ data: { nombre, paisId } });
  res.json(nuevo);
});

app.put('/departamentos/:id', async (req, res) => {
  const { nombre, paisId } = req.body;
  const { id } = req.params;
  const actualizado = await prisma.departamento.update({ where: { id: Number(id) }, data: { nombre, paisId } });
  res.json(actualizado);
});

app.delete('/departamentos/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.departamento.delete({ where: { id: Number(id) } });
  res.json({ message: 'Departamento eliminado' });
});

// ------------------- MUNICIPIOS -------------------
app.get('/municipios', async (req, res) => {
  const items = await prisma.municipio.findMany();
  res.json(items);
});

app.post('/municipios', async (req, res) => {
  const { nombre, departamentoId } = req.body;
  const nuevo = await prisma.municipio.create({ data: { nombre, departamentoId } });
  res.json(nuevo);
});

app.put('/municipios/:id', async (req, res) => {
  const { nombre, departamentoId } = req.body;
  const { id } = req.params;
  const actualizado = await prisma.municipio.update({ where: { id: Number(id) }, data: { nombre, departamentoId } });
  res.json(actualizado);
});

app.delete('/municipios/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.municipio.delete({ where: { id: Number(id) } });
  res.json({ message: 'Municipio eliminado' });
});

// ------------------- EMPRESAS -------------------
app.get('/empresas', async (req, res) => {
  const items = await prisma.empresa.findMany();
  res.json(items);
});

app.post('/empresas', async (req, res) => {
  const { paisId, departamentoId, municipioId, nit, razonSocial, nombreComercial, telefono, correo } = req.body;
  const nueva = await prisma.empresa.create({
    data: { paisId, departamentoId, municipioId, nit, razonSocial, nombreComercial, telefono, correo }
  });
  res.json(nueva);
}); 

app.put('/empresas/:id', async (req, res) => {
  const { paisId, departamentoId, municipioId, nit, razonSocial, nombreComercial, telefono, correo } = req.body;
  const { id } = req.params;
  const actualizado = await prisma.empresa.update({
    where: { id: Number(id) },
    data: { paisId, departamentoId, municipioId, nit, razonSocial, nombreComercial, telefono, correo }
  });
  res.json(actualizado);
});

app.delete('/empresas/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.empresa.delete({ where: { id: Number(id) } });
  res.json({ message: 'Empresa eliminada' });
});

// ------------------- COLABORADORES -------------------
app.get('/colaboradores', async (req, res) => {
  const items = await prisma.colaborador.findMany();
  res.json(items);
});

app.post('/colaboradores', async (req, res) => {
  const { empresaId, nombreCompleto, edad, telefono, correo } = req.body;
  const nuevo = await prisma.colaborador.create({
    data: { empresaId, nombreCompleto, edad, telefono, correo }
  });
  res.json(nuevo);
});

app.put('/colaboradores/:id', async (req, res) => {
  const { empresaId, nombreCompleto, edad, telefono, correo } = req.body;
  const { id } = req.params;
  const actualizado = await prisma.colaborador.update({
    where: { id: Number(id) },
    data: { empresaId, nombreCompleto, edad, telefono, correo }
  });
  res.json(actualizado);
});

app.delete('/colaboradores/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.colaborador.delete({ where: { id: Number(id) } });
  res.json({ message: 'Colaborador eliminado' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));