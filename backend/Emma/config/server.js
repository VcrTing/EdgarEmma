module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', '6ed556285e18c689997088b90635af48'),
    },
  },
  cron: {
    enabled: env.bool('CRON_ENABLED', true),
  }
});
