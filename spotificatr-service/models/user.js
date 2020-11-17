
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: DataTypes.STRING,
    displayName: DataTypes.STRING,
    spotifyId: DataTypes.STRING,
    hashedPassword: DataTypes.STRING,
    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,
    tokenExpiration: DataTypes.DATE
  }, {})
  User.associate = models => {
    User.hasMany(models.PlaylistNotes, {
      foreignKey: 'userId',
      as: 'notes'
    })
  }
  return User
}