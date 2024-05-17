const sequelize = require('../db')
const {DataTypes} = require('sequelize')

// const Users = sequelize.define('users', {
//     id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
//     email: {type: DataTypes.STRING, unique: true,},
//     password: {type: DataTypes.STRING},
//     role: {type: DataTypes.STRING, defaultValue: "USER"},
// })



// -----------корзина-------------

// const Basket = sequelize.define('basket', {
//   id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
// })




const Users = sequelize.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING(20),
    unique: true
  },
  first_name: {
    type: DataTypes.STRING(20)
  },
  last_name: {
    type: DataTypes.STRING(20)
  },
  email: {
    type: DataTypes.STRING(255),
    unique: true
  },
  password: {
    type: DataTypes.STRING(60)
  },
  
  role: {type: DataTypes.STRING, defaultValue: "USER"},

}, {
  tableName: 'Users',
  timestamps: false
});

  const UserFolders = sequelize.define('user_folders', {
    folder_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    category_name: {
      type: DataTypes.STRING(60)
    },
   
  }, {
    tableName: 'UserFolders',
    timestamps: false
  });
  
  const Statuses = sequelize.define('statuses', {
    status_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(60)
    }
  }, {
    tableName: 'Statuses',
    timestamps: false
  });
  
  const UserTasks = sequelize.define('user_tasks', {
    userTask_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: DataTypes.STRING(100)
    },
    start_date: {
      type: DataTypes.DATE
    },
    end_date: {
      type: DataTypes.DATE
    },
    description: {
      type: DataTypes.STRING(255)
    },
   
  }, {
    tableName: 'UserTasks',
    timestamps: false
  });  
  
  const Projects = sequelize.define('Projects', {
    project_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    project_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false
    },

    }, {
    tableName: 'Projects',
    timestamps: false
  });
  
  const ProjectMembers = sequelize.define('project_members', {
    member_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

  }, {
    tableName: 'ProjectMembers',
    timestamps: false
  });

  const ProjectTasks = sequelize.define('project_tasks', {
    projectTask_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    task_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
    },
    url: {
      type: DataTypes.STRING(255),
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
   
  }, {
    tableName: 'ProjectTasks',
    timestamps: false
  });
  
  const Teams = sequelize.define('teams', {
    team_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    team_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
  }, {
    tableName: 'Teams',
    timestamps: false
  });
  
  const TeamMembers = sequelize.define('team_members', {
    TeamMember_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
  }, {
    tableName: 'TeamMembers',
    timestamps: false
  });
  
  const Roles = sequelize.define('roles', {
    role_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    canView: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canReply: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canEdit: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    canInvite: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    tableName: 'Roles',
    timestamps: false
  });
  
  const ProjectFiles = sequelize.define('project_files', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    file_name: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
  }, {
    tableName: 'ProjectFiles',
    timestamps: false
  });
  
  const Employers = sequelize.define('employers', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
  }, {
    tableName: 'Employers',
    timestamps: false
  });
  
const ResultOfTask = sequelize.define('result_Of_task', {
  id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
  },
  end_date: {
      type: DataTypes.DATE,
      allowNull: false
  },
  isAccept: {
      type: DataTypes.BOOLEAN,
      allowNull: false
  },
  comment: {
      type: DataTypes.STRING(100),
      allowNull: false
  },
}, {
  tableName: 'ResultOfTask',
  timestamps: false
});
  

// Связь между Users и UserFolder один ко многим
Users.hasMany(UserFolders, { foreignKey: 'user_id' });
UserFolders.belongsTo(Users, { foreignKey: 'user_id' });

// Связь между UserFolder и UserTasks один ко многим
UserFolders.hasMany(UserTasks, { foreignKey: 'folder_id' });
UserTasks.belongsTo(UserFolders, { foreignKey: 'folder_id' });

// Связь между Status и UserTasks один ко многим
Statuses.hasMany(UserTasks, { foreignKey: 'status_id' });
UserTasks.belongsTo(Statuses, { foreignKey: 'status_id' });

// Рекурсивная связь для UserTasks (напоминает иерархию задач)
UserTasks.hasMany(UserTasks, { as: 'subTasks', foreignKey: 'parentTask_id' });
UserTasks.belongsTo(UserTasks, { as: 'parentTask', foreignKey: 'parentTask_id' });


// Связь между Users и Teams один ко многим
Users.hasMany(Teams, { foreignKey: 'user_id' });
Teams.belongsTo(Users, { foreignKey: 'user_id' });

// Связь между Teams и TeamMembers один ко многим
Teams.hasMany(TeamMembers, { foreignKey: 'team_id' });
TeamMembers.belongsTo(Teams, { foreignKey: 'team_id' });

// Связь между Users и TeamMembers один ко многим
Users.hasMany(TeamMembers, { foreignKey: 'user_id' });
TeamMembers.belongsTo(Users, { foreignKey: 'user_id' });

// Связь между Teams и Projects один ко многим
Teams.hasMany(Projects, { foreignKey: 'team_id' });
Projects.belongsTo(Teams, { foreignKey: 'team_id' });

// Связь многое ко многому между Projects и TeamMembers через ProjectMembers
TeamMembers.belongsToMany(Projects, { through: ProjectMembers, foreignKey: 'TeamMember_id' });
Projects.belongsToMany(TeamMembers, { through: ProjectMembers, foreignKey: 'project_id' });

// Связь между Role и ProjectMembers один ко многим
Roles.hasMany(ProjectMembers, { foreignKey: 'role_id' });
ProjectMembers.belongsTo(Roles, { foreignKey: 'role_id' });

// Связь между Projects и ProjectTasks один ко многим
Projects.hasMany(ProjectTasks, { foreignKey: 'project_id' });
ProjectTasks.belongsTo(Projects, { foreignKey: 'project_id' });

// Связь между ProjectTasks и ProjectFiles один ко многим
ProjectTasks.hasMany(ProjectFiles, { foreignKey: 'projectTask_id' });
ProjectFiles.belongsTo(ProjectTasks, { foreignKey: 'projectTask_id' });

// Связь между ProjectTasks и Employers один ко многим
ProjectTasks.hasMany(Employers, { foreignKey: 'projectTask_id' });
Employers.belongsTo(ProjectTasks, { foreignKey: 'projectTask_id' });

// Связь между ProjectMembers и Employers один ко многим
ProjectMembers.hasMany(Employers, { foreignKey: 'member_id' });
Employers.belongsTo(ProjectMembers, { foreignKey: 'member_id' });

// Связь между Employers и ResultOfTask один ко многим
Employers.hasMany(ResultOfTask, { foreignKey: 'employers_id' });
ResultOfTask.belongsTo(Employers, { foreignKey: 'employers_id' });

// Связь между ProjectTasks и ResultOfTask один ко многим
ProjectTasks.hasMany(ResultOfTask, { foreignKey: 'projectTask_id' });
ResultOfTask.belongsTo(ProjectTasks, { foreignKey: 'projectTask_id' });


// -----------корзина-------------

// Users.hasOne(Basket)
// Basket.belongsTo(Users)

// Basket.hasMany(Projects)
// Projects.belongsTo(Basket)

// Basket.hasMany(ProjectTasks)
// ProjectTasks.belongsTo(Basket)

// Basket.hasMany(UserTasks)
// UserTasks.belongsTo(Basket)



module.exports = {
    Users,
    UserFolders,
    Statuses,
    UserTasks,
    Teams,
    TeamMembers,
    Projects,
    Roles,
    ProjectMembers,
    ProjectTasks,
    ProjectFiles,
    Employers,
    ResultOfTask
}





