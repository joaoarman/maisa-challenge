import { z } from 'zod';

const loginModel = z.object({
    email: z.string().email(),
    password: z.string().min(6)
});

const defineManager = (sequelize, DataTypes) => {
  const Manager = sequelize.define('Manager', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    },
    isActive: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 1
    }
  }, {
    tableName: 'manager',
    timestamps: true
  });
  
  return Manager;
};

// Export validation schema and model definition
export { loginModel };
export default defineManager; 