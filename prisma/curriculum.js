// Trade Academy curriculum.
//
// Content lives here, separate from seed.js, so it can be edited without
// touching the seeding mechanics. seed.js imports this and upserts it.
//
// ─────────────────────────────────────────────────────────────────────────
// EVERYTHING HERE IS published: false UNTIL WILL HAS CHECKED IT.
//
// Every page in the app filters on `published: true`, so unpublished lessons
// are invisible to a signed-in user. Nothing below reaches an apprentice or a
// customer until someone qualified has read it and flipped the flag.
//
// This draft was written by Claude to give the module a shape. The structure
// and the ordering are the contribution; the technical detail needs a
// plumber's eye before it teaches anyone anything.
// ─────────────────────────────────────────────────────────────────────────
//
// SCOPE — wet-side only. Rosebourne is WaterSafe/WRAS approved and G3
// qualified for unvented hot water, and is NOT Gas Safe, OFTEC, MCS or Part P
// registered. No lesson here touches the inside of a gas or oil boiler, and
// where a fault points that way the lesson says to call a Gas Safe engineer.
//
// videoUrl is null on every lesson. Each one is a video Will still has to
// film; the lesson text is the script and the standalone reference.

const modules = [
  {
    title: 'Everyday Plumbing Problems',
    description:
      'The faults people actually hit at home, and actually search for at ' +
      '9pm with water on the floor. What is going wrong, what you can safely ' +
      'sort yourself, and the point at which it needs a plumber.',
    estimatedHours: 3,
    order: 1,
    published: false,
    lessons: [
      {
        title: 'Find your stopcock before you need it',
        description:
          'The single most useful thing any householder can know. Where it is, how to turn it, and what to do if it will not move.',
        duration: 15,
        order: 1,
        published: false,
        videoUrl: null,
        content: `Every job on this list gets smaller if you can turn the water off. Every one of them gets a great deal bigger if you cannot.

**Where the internal stopcock usually is**

Under the kitchen sink is the most common spot. After that: a downstairs cloakroom, an airing cupboard, under the stairs, in a garage or utility, or near where the mains enters the house — often the wall facing the road.

In a flat it may be in a communal cupboard or riser rather than inside the flat itself.

**Turning it off**

Clockwise to close. It is usually a chrome or brass valve on the pipe, either a wheel-style crosshead or a lever.

**If it will not move**

A stopcock that has not been touched in fifteen years often seizes. Do not force it with a wrench — the body is brass and the tap can snap off in your hand, which turns a dripping tap into a mains leak you cannot stop. If it will not turn by hand, leave it and get it changed before you need it in anger.

**The outside stopcock**

There is usually a second one at the boundary, under a small metal or plastic cover in the path or pavement, often with a long vertical chamber. A stopcock key reaches it — they cost a few pounds. That valve belongs to the water company, but you are generally allowed to operate it in an emergency.

**Worth doing today**

Find it. Turn it off, run a tap until it stops, turn it back on. That tells you it works and shows you how long the house takes to drain down. Then tell everyone else in the house where it is.`,
      },
      {
        title: 'A dripping tap',
        description:
          'Why it drips, the difference between a washer tap and a cartridge tap, and why a drip is worth fixing sooner than people think.',
        duration: 25,
        order: 2,
        published: false,
        videoUrl: null,
        content: `A tap drips because the thing sealing it has worn. Which thing depends on the tap.

**Two kinds of tap**

*Traditional taps* turn several times from off to fully on, and have a rubber washer at the bottom of the spindle. The washer compresses against a seat every time you close the tap, and eventually it hardens, splits, or the brass seat underneath it corrodes and roughens.

*Quarter-turn taps* and most modern mixers go from off to on in a quarter turn. There is no washer — there is a ceramic disc cartridge, two polished discs that slide across each other. When these fail it is usually grit scoring the discs, or limescale.

Which you have decides the repair: a washer costs pennies, a cartridge is a specific part for that make and model.

**Why bother**

A drip is not just noise. In a hard water area the constant wet leaves scale marks in the basin or bath that do not come off. On a hot tap you are paying to heat water that goes down the drain. And a tap that drips is a tap whose seat is wearing — leave it long enough and a washer job becomes a reseat or a new tap.

**Before you start**

Isolate the tap, not the whole house, if there is a service valve on the pipe below it — a small slotted valve you turn with a flat screwdriver, quarter turn, slot across the pipe means closed. If there is not one, this is the job where you use the stopcock.

Then open the tap and let it drain. Put the plug in. Every plumber has lost a small brass screw down a waste.

**When it is not worth repairing**

If the tap body is pitted, the chrome is lifting, or it is a cheap mixer where the cartridge is not available as a spare, replacing the tap costs less than the second attempt at fixing it.`,
      },
      {
        title: 'A toilet that will not stop running',
        description:
          'Telling a leaking flush valve from an overfilling inlet valve, and why this one quietly costs real money.',
        duration: 25,
        order: 3,
        published: false,
        videoUrl: null,
        content: `A continuously running toilet is one of the most expensive faults in the house, and the easiest to ignore because nothing is visibly broken.

**Work out which valve is at fault**

There are two candidates inside the cistern.

The *flush valve* sits in the middle and lets water down into the pan when you press the button. If its seal is not sitting properly, water trickles past it continuously and you get a permanent thin stream down the back of the pan.

The *fill valve* (the inlet, often still called a ballvalve) lets water into the cistern and should shut off at a set level. If it does not shut off, the cistern overfills and the excess goes down the overflow — on modern toilets, into the pan.

**The pencil test**

Wipe the back of the pan dry, then draw a line just above the water level with a pencil. Come back in ten minutes with the toilet unused. Water running down over the line means it is coming past the flush valve. A rising level in the cistern instead means the fill valve is not shutting off.

**Common causes**

Flush valve: grit or limescale on the seal, a perished seal, or the valve not seating because the flush mechanism is catching.

Fill valve: a worn diaphragm, debris in the inlet, or the float arm set too high so it never reaches shut-off.

**Why it matters**

This is not a drip. A running toilet passes a surprising volume continuously, day and night. On a water meter it shows up on the bill; on an unmetered supply you will not see it at all, which is why these run for months.

**Worth knowing**

Cistern internals are mostly standard parts and not expensive. The fiddly bit is usually getting the cistern off the wall or the pan, not the part itself — which is why a plumber quoting this will be quoting for access and time, not components.`,
      },
      {
        title: 'A slow or blocked sink',
        description:
          'Why the trap is almost always the answer, and why the bottle of drain cleaner under the sink usually is not.',
        duration: 25,
        order: 4,
        published: false,
        videoUrl: null,
        content: `Most kitchen and basin blockages are within arm's reach of where you are standing.

**Where it actually blocks**

The trap — the U-bend below the waste — is designed to hold water to stop drain smells coming back up. It is also the first place anything solid stops moving. Kitchen traps fill with fat and food; basin traps fill with hair, soap and toothpaste.

If the sink drains slowly but does drain, it is usually a partial blockage in the trap. If it does not drain at all and the trap is clear, the problem is further along the waste pipe.

**Before you reach for the chemicals**

Caustic drain cleaner is worth thinking twice about. It may clear a partial blockage; on a complete one it sits in the pipe doing very little except making the water in there dangerous. If someone then has to open that trap — you or a plumber — they are opening a trap full of caustic solution. If you have already used it, say so.

Hot water and a plunger clear a lot of kitchen blockages on their own. Not boiling water if you have plastic waste pipes or a plastic trap.

**Taking a trap off**

Bucket underneath first, every time — the trap is full of water and so is the section of pipe behind it. Most modern traps undo by hand. Clean it out, check the washers are seated when it goes back, and run the tap while looking at the joints.

**When it is not the trap**

A blockage affecting several fittings at once — sink and bath together, or a downstairs toilet as well — is not a trap. That is the branch or the soil stack, and it needs someone with rods or a drain machine.

**Preventing the kitchen one**

Fat is what does it. It leaves the pan liquid and sets in the pipe. Into a jar and in the bin, not down the sink.`,
      },
      {
        title: 'A radiator cold at the top',
        description:
          'What bleeding actually does, how to do it without making a mess, and what it means when the same radiator goes cold again a fortnight later.',
        duration: 25,
        order: 5,
        published: false,
        videoUrl: null,
        content: `Cold at the top and warm at the bottom is the classic pattern, and it means air.

**Why air gets in**

A central heating system is a sealed loop of water. Air finds its way in through topping up, through small leaks drawing air in as the system cools, and through corrosion inside the system producing gas. Air rises, so it collects at the top of the tallest point — usually the highest radiator, or the ones upstairs.

**Bleeding it**

Heating off and the system cool. Bleed key on the square nipple at the top corner of the radiator, cloth underneath, quarter turn anticlockwise. You will hear air. When water comes out instead — and it will, so have the cloth ready — close it.

Do the downstairs radiators before the upstairs ones if you are doing several.

Then check the system pressure afterwards. Letting air out drops the pressure, and if it falls too low the boiler will lock out.

**The bit that matters**

A radiator that needs bleeding once is normal. A radiator that needs bleeding again a few weeks later is telling you something. Air is getting back in, and that means either a leak somewhere drawing air in, or corrosion inside the system generating hydrogen. Neither fixes itself, and the second one is slowly filling your system with sludge.

Repeated bleeding is a symptom, not a maintenance routine.

**Cold at the bottom is a different fault**

Cold at the *bottom* and warm at the top is not air — that is sludge and debris sitting in the bottom of the radiator where the water should be flowing. Bleeding will not touch it. That is a flush, or in a bad case a radiator that needs taking off and cleaning out.

**Where this stops being DIY**

Anything involving the boiler itself is Gas Safe work. Radiators, valves, pipework and flushing are wet-side and are what we do. If the fault turns out to be inside the boiler, that is a Gas Safe engineer's job — and we will tell you so rather than take the work.`,
      },
      {
        title: 'No hot water, or never enough of it',
        description:
          'Narrowing down where the problem is before anyone spends money, and the difference between a fault and a system that was always too small.',
        duration: 30,
        order: 6,
        published: false,
        videoUrl: null,
        content: `"No hot water" covers several completely different problems. The first job is working out which one.

**First: what kind of system is it?**

*Combi* — no cylinder anywhere, hot water made on demand as you draw it.

*Cylinder system* — a hot water cylinder, usually in an airing cupboard. Either vented, with a cold tank in the loft feeding it, or unvented, a sealed pressurised cylinder with no loft tank.

The answer changes every diagnosis that follows, so it is worth knowing which one you have before you ring anybody.

**No hot water at all**

On a cylinder system, check the heating controls and the timer first — a hot water schedule that has reset after a power cut is a common and free fix. Then whether the heating still works: heating fine but no hot water usually points at the cylinder, its coil or the valve feeding it, rather than the heat source.

On a combi, no hot water *and* no heating points at the boiler, which is Gas Safe work and not ours.

**Hot water that runs out too quickly**

On a cylinder, this is usually one of three things: the cylinder is genuinely too small for the household, the immersion or coil is scaled up and heating inefficiently, or the thermostat is set low.

It can also be a failed internal component letting cold mix in. On an unvented cylinder that is G3 work — a sealed pressurised vessel, and legally it must be worked on by someone G3 qualified. That is a qualification we hold.

**Lukewarm rather than hot**

Look at the thermostat setting, and at whether a blending valve is in circuit. Also worth knowing: storing hot water too cool has a safety implication, because the temperature that scalds is also the temperature that keeps the cylinder safe from bacteria. There is a correct range, and guessing at it is not sensible.

**Where the line is**

Cylinders, immersions, coils, pipework, valves and unvented systems are wet-side and are our work. The inside of a gas or oil boiler is not — that is Gas Safe or OFTEC. If the fault is in the boiler we will tell you plainly and point you at someone registered to do it.`,
      },
      {
        title: 'Low water pressure',
        description:
          'Telling a whole-house problem from a single-tap problem, and why "pressure" and "flow" are not the same thing.',
        duration: 25,
        order: 7,
        published: false,
        videoUrl: null,
        content: `Before diagnosing anything, work out whether it is the whole house or one outlet, because they are unrelated problems.

**One tap or shower only**

Almost always a blockage at that fitting, not a supply problem. The aerator on the end of a tap spout unscrews and fills with scale and grit. A shower head does the same. Both clean out in a few minutes.

If it is a shower that has gone weak, also check whether it is thermostatic — a failing thermostatic cartridge can throttle flow as it fails.

**The whole house**

Now it is worth asking whether it is pressure or flow. They get used interchangeably and they are not the same thing.

*Pressure* is the force pushing the water. *Flow* is how much arrives per minute. You can have good pressure and poor flow — most commonly through old, narrow or scaled-up pipework that simply cannot pass enough water, however hard it is being pushed.

**Common causes across the house**

A partially closed stopcock, often after someone has worked on the system. Old galvanised or lead pipework, or 15mm where 22mm should be. Scale narrowing the bore in a hard water area — and this whole corner of Wiltshire, Hampshire and Berkshire is hard water. A shared supply where a neighbour's demand affects yours. Or genuinely low mains pressure from the street, which the water company can test.

**Worth knowing before you buy anything**

Pumps and accumulators do fix real problems, but they fix *specific* ones, and fitting the wrong one to the wrong fault is expensive and disappointing. On a mains-fed system there are also rules about what you are allowed to pump directly from the mains. Measure first: a flow rate test takes a few minutes and tells you which problem you actually have.`,
      },
      {
        title: 'A leak under the sink',
        description:
          'Finding where it is really coming from, what is safe to nip up, and what tightening will make worse.',
        duration: 25,
        order: 8,
        published: false,
        videoUrl: null,
        content: `Water under a sink has usually travelled before it dripped, so the puddle is rarely below the fault.

**Find the actual source**

Dry everything completely. Lay kitchen roll or dry tissue under each joint in turn — the tap tails, the service valves, the flexible connectors, the trap joints, the waste connection at the sink. Then run water and watch which paper wets first.

Worth separating the two systems while you are at it: run the tap and watch, then fill the bowl and pull the plug and watch. A leak that only appears when you drain the sink is the waste side, not the supply.

**What is safe to tighten**

Plastic trap joints are hand-tight. If one weeps, undo it, check the washer is present and seated the right way round and not twisted, and do it back up by hand. A trap joint that needs pliers has something wrong with the washer or the alignment, and forcing it will crack the nut.

Compression joints on copper take a gentle nip — a fraction of a turn with a spanner while holding the body still. Only a fraction.

**What tightening will make worse**

Flexible tap connectors. If the braided hose itself is weeping, or you can see rust or fraying through the braid, tightening does nothing because the fault is the hose. Those fail, sometimes suddenly, and a failed one under a kitchen sink delivers mains water continuously until someone finds it. Replace, do not tighten.

An overtightened compression joint deforms the olive and then leaks permanently, and the fix is cutting it out.

**A weeping joint is not a slow problem**

Constant damp in a kitchen carcase swells the chipboard, and by the time it shows on the outside the base has usually gone. The cost of this job is almost never the plumbing — it is the unit and the floor underneath. That is the argument for dealing with it the week you notice it.

**Know the isolation**

Most under-sink supplies have service valves. Find them before you start, so the answer to "it is now spraying" is a screwdriver and a quarter turn rather than a sprint to the stopcock.`,
      },
    ],
  },
]

module.exports = { modules }
