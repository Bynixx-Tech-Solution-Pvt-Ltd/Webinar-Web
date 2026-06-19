const bcrypt = require('bcrypt');

// POST /login
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password required' });
  }
  try {
    const user = await findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    // For demo, passwords stored as plain text in password_hash column
    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    // Return role and id for frontend routing
    return res.json({
      success: true,
      message: 'Login successful',
      userId: user.id,
      role: user.role,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

// POST /signup
async function signup(req, res) {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: 'Name, email and password required' });
  }
  // Default role to student if not provided or invalid
  const allowedRoles = ['student', 'mentor', 'admin'];
  const userRole = allowedRoles.includes(role) ? role : 'student';
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({ name, email, password_hash: hashedPassword, role: userRole });
    return res.status(201).json({
      success: true,
      message: 'User created',
      userId: newUser.id,
      role: newUser.role,
    });
  } catch (err) {
    if (err.code === '23505') { // unique_violation
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
}

module.exports = { login, signup };
