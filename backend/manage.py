from flask_migrate import Migrate, MigrateCommand
from flask.cli import with_appcontext
import click
from app import app, db

migrate = Migrate(app, db)

@click.command(name='migrate')
@with_appcontext
def migrate():
    """Run database migrations."""
    from flask_migrate import upgrade, migrate, init, stamp
    init()
    stamp()
    migrate()
    upgrade()

if __name__ == '__main__':
    app.cli.add_command(migrate)
    app.run()
