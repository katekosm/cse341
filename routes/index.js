const routes = app.get('/', (req, res, next) => {
    res.json('Awesome person');
});

export default routes;