# Tilex - Today I Learned

> Today I Learned is an open-source project that originated from the team at
> [Hashrocket](https://hashrocket.com/) and catalogues the sharing &
> accumulation of knowledge as it happens day-to-day. Posts have a 200-word
> limit, and posting is open to any Rocketeer as well as select friends of the
> team. We hope you enjoy learning along with us.

This site was open-sourced as a window into the development process, as well as
to allow people to experiment with the site on their own and contribute to the
project.


### Installation

Assuming you have an [Elixir installation](https://elixir-lang.org/install.html).
Then install the [Phoenix
Dependencies](http://www.phoenixframework.org/docs/installation) and
PostgreSQL.

Next, follow these setup steps (includes database seeds):

```
$ git clone https://github.com/energizedwork/tilex
$ cd tilex
$ mix deps.get
$ mix ecto.setup
$ cd assets && npm install
$ cd ..
$ mix phoenix.server
```

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

To serve the app at a different port, include the `PORT` environment
variable when starting the server:

```
$ PORT=4444 mix phoenix.server
```

To set environmental variables, copy the example file:

```
$ cp .env{.example,}
```

Then, set your variables and source them:

```
$ source .env
```

### Testing

Wallaby relies on PhantomJS; install it:

```
$ npm install -g phantomjs
```

Run the tests with:

```
$ mix test
```

### Deployment

The app has a continuous delivery pipeline on Heroku.

Pushes to Github master → Heroku CI → Staging deploy.

Review changes and then manually promote to Production when ready.

These are the Tilex deployed instances:

- Staging: https://til-staging.energizedwork.com
- Production: https://ew-til.energizedwork.com

Database migrations require telling Heroku how many pools to use. Here's an
example:

```
$ heroku run "POOL_SIZE=2 mix ecto.migrate"
```

### Contributing

1. [Fork](https://help.github.com/articles/fork-a-repo/) it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Make some changes with accompanying tests
4. Ensure the entire test suite passes (`mix test`)
5. Stage the relevant changes (`git add --patch`)
6. Commit your changes (`git commit -m 'Add some feature'`)
7. Push to the branch (`git push origin my-new-feature`)
8. Create new Pull Request

Adding a database migration? Ensure it can be rolled back with this command:

```
$ mix ecto.twiki
```

Bug reports and pull requests are welcome on GitHub at
https://github.com/hashrocket/tilex. This project is intended to be a safe,
welcoming space for collaboration, and contributors are expected to adhere to
the [Contributor Covenant](http://contributor-covenant.org) code of conduct.

### Usage

We love seeing forks of Today I Learned in production! Please consult our
[usage guide](/USAGE.md) for guidelines on appropriate styling and attribution.

### License

Tilex is released under the [MIT License](http://www.opensource.org/licenses/MIT).

---

### About

[![EW logo](https://til.energizedwork.com/images/ew-logo.svg)](https://energizedwork.com)

Tilex is supported by the team at [Energized Work, a creative technology and product innovation lab making remarkable things out of the internet](https://energizedwork.com). If you'd like to [work with
us](https://energizedwork.com/) or [join our
team](https://energized-work.breezy.hr), don't hesitate to get in touch.
