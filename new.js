cp----- category {
    dataValues: {
      id: 1,
      name: 'node',
      createdAt: 2020-04-23T00:52:25.352Z,
      updatedAt: 2020-04-23T00:52:25.352Z,
      projects: []
    },
    _previousDataValues: {
      id: 1,
      name: 'node',
      createdAt: 2020-04-23T00:52:25.352Z,
      updatedAt: 2020-04-23T00:52:25.352Z,
      projects: []
    },
    _changed: {},
    _modelOptions: {
      timestamps: true,
      validate: {},
      freezeTableName: false,
      underscored: false,
      paranoid: false,
      rejectOnEmpty: false,
      whereCollection: { id: '1' },
      schema: null,
      schemaDelimiter: '',
      defaultScope: {},
      scopes: {},
      indexes: [],
      name: { plural: 'categories', singular: 'category' },
      omitNull: false,
      sequelize: Sequelize {
        options: [Object],
        config: [Object],
        dialect: [PostgresDialect],
        queryInterface: [QueryInterface],
        models: [Object],
        modelManager: [ModelManager],
        connectionManager: [ConnectionManager],
        importCache: [Object]
      },
      hooks: {}
    },
    _options: {
      isNewRecord: false,
      _schema: null,
      _schemaDelimiter: '',
      include: [ [Object] ],
      includeNames: [ 'projects' ],
      includeMap: { projects: [Object] },
      includeValidated: true,
      attributes: [ 'id', 'name', 'createdAt', 'updatedAt' ],
      raw: true
    },
    isNewRecord: false,
    projects: []
  }
  GET /categories/1 200 51.800 ms - 2315
  GET /js/app.js 200 1.693 ms - 2426
  GET /favicon.ico 200 1.569 ms - 2426
  