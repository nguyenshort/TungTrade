module.exports = {
    apps: [
        {
            name: 'trading-view',
            exec_mode: 'cluster',
            instances: 'max', // Or a number of instances
            script: 'npm',
            args: 'start'
        }
    ]
}
