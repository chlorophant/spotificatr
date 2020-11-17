
module.exports = (sequelize, DataTypes) => {
  const PlaylistNotes = sequelize.define('PlaylistNotes', {
    noteId: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    text: DataTypes.STRING,
    playlistId: DataTypes.STRING,
    userId: DataTypes.UUIDV4
  }, {})
  PlaylistNotes.associate = models => {
    PlaylistNotes.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user'
    })
  }
  return PlaylistNotes
}