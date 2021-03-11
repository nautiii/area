const { string } = require("@hapi/joi");

const availableServices = [
    {
        name: 'Google Drive',
        actions: [
            {
                name: 'File created',
                params: [
                    {
                        name: 'File name',  // USER
                        type: 'string',      // DEVS
                        input: false,
                        placeholder: ''
                    }
                ]
            }
        ],
        reactions: [
            {
                name: 'Create file',
                params: [
                    {
                        name: 'File name',
                        type: 'string',
                        input: false,
                        placeholder: ''
                    }
                ]
            }
        ]
    },
    {
        name: 'Google Calendar',
        actions: [
            {
                name: 'Event created',
                params: [
                    {
                        name: 'Event name', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Calendar to look at'
                    },
                    {
                        name: 'Event time slot', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Calendar to look at'
                    },
                ]
            }
        ],
        reactions: [
            {
                name: 'Create event',
                params: [
                    {
                        name: 'Event name',
                        type: 'string',
                        input: false,
                        placeholder: ''
                    },
                    {
                        name: 'Description',
                        type: 'string',
                        input: true,
                        placeholder: ''
                    }

                ]
            }
        ]
    },
    {
        name: 'Github',
        actions: [
            {
                name: 'New commit',
                params: [
                    {
                        name: 'Commit author', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Repository name'
                    },
                    {
                        name: 'Commit message', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Repository name'
                    }
                ]
            },
            {
                name: 'New pull request',
                params: [
                    {
                        name: 'Pull request title', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Repository name'
                    },
                    {
                        name: 'Pull request author', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Repository name'
                    }
                ]
            },
            {
                name: 'New Fork',
                params: [
                    {
                        name: 'Forker name', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Repository name'
                    }
                ]
            }
        ],
    },
    {
        name: 'Discord',
        actions: [
            {
                name: 'Server created',
                params: [
                    {
                        name: 'Server name', // USER
                        type: 'string',      // DEVS
                        input: false,
                        placeholder: ''
                    }
                ]
            }
        ],
        reactions: [
            {
                name: 'Bot notification',
                params: [
                    {
                        name: 'Notification content',
                        type: 'string',
                        input: false,
                        placeholder: ''
                    }
                ]
            }
        ]
    },
    {
        name: 'Spotify',
        actions: [
            {
                name: 'Track added',
                params: [
                    {
                        name: 'Track name', // USER
                        type: 'string',      // DEVS
                        input: true,
                        placeholder: 'Playlist name to check in'
                    }
                ]
            }
        ]
    },
    {
        name: 'Facebook',
        actions: [
            {
                name: 'Facebook likes',
                params: [
                    {
                        name: 'Name of the like', // USER
                        type: 'string',      // DEVS
                        input: false,
                        placeholder: ''
                    }
                ]
            }
        ]
    },
    {
        name: 'Google Mail',
        reactions: [
            {
                name: 'Google Mail',
                params: [
                    {
                        name: 'Send a mail',
                        type: 'string',
                        input: true,
                        placeholder: 'Write an email to'
                    }
                ]
            }
        ]
    }
];

module.exports.availableServices = availableServices;