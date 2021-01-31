    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Composite = Matter.Composite,
        Composites = Matter.Composites,
        Common = Matter.Common,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        element: document.body,
        engine: engine,
        options: {
            width: 1500,
            height: 890,
            wireframes: false,
            background: '#4eb1a2',
            stroke: 'noStroke'

        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // add bodies
    World.add(world, [
        Bodies.rectangle(40, 915, 3000, 50.5, { isStatic: true }),
        Bodies.rectangle(40, 5, 3000, 50.5, { isStatic: true }),
        Bodies.rectangle(-25, 800, 50.5, 3000, { isStatic: true }),
        Bodies.rectangle(1525, 0, 50.5, 3000, { isStatic: true })
    ]);

    var stack = Composites.stack(100, 0, 10, 8, 10, 10, function(x, y) {
        return Bodies.circle(x, y, Common.random(40, 60), {
          restitution: 0.6,
          friction: 0.1,
          render: {
            fillStyle: '#754db3',
            strokeStyle: '#ffffff',
            strokeWidth: 0
          }


        });
    });

    World.add(world, [
        stack,
        // Bodies.polygon(200, 460, 3, 60),
        // Bodies.polygon(400, 460, 5, 60),
        // Bodies.rectangle(600, 460, 80, 80)
    ]);

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.2,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;


  
