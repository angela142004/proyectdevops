import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

/**
 * Obtener todos los usuarios
 */
export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    // Elimina password_hash de cada usuario
    const usersSafe = users.map(({ password_hash, ...user }) => user);
    res.json(usersSafe);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los usuarios" });
  }
};

/**
 * Obtener un usuario por ID
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
    });
    if (!user) return res.status(404).json({ error: "Usuario no encontrado" });
    // Elimina el campo password_hash antes de responder
    const { password_hash, ...userSafe } = user;
    res.json(userSafe);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el usuario" });
  }
};

/**
 * Crear un nuevo usuario
 */
export const createUser = async (req, res) => {
  const { username, email, password, is_admin } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password_hash: hashedPassword,
        is_admin: is_admin ?? false,
      },
    });
    // Elimina password_hash antes de responder
    const { password_hash, ...userSafe } = newUser;
    res.status(201).json(userSafe);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

/**
 * Actualizar un usuario existente
 */
export const updateUser = async (req, res) => {
  const { username, email, password, is_admin } = req.body;
  try {
    let dataToUpdate = {
      username,
      email,
      is_admin,
    };
    if (password && password.trim() !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      dataToUpdate.password_hash = hashedPassword;
    }
    const updatedUser = await prisma.user.update({
      where: { id: Number(req.params.id) },
      data: dataToUpdate,
    });
    // Elimina password_hash antes de responder
    const { password_hash, ...userSafe } = updatedUser;
    res.status(200).json(userSafe);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el usuario" });
  }
};

/**
 * Eliminar un usuario
 */
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el usuario" });
  }
};

export const User = prisma.user; // Exporta el modelo User para su uso en otros controladores
