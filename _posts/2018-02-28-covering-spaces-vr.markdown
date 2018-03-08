---
layout: post
title:  "Covering spaces for Virtual Reality"
date:   2018-02-28 04:13:42 +0000
categories: jekyll update
---
Covering spaces are studied in Algebraic Topology.  Their theory is absolutely beautiful but requires a fair knowledge of group theory to fully appreciate.  Perhaps this is why they haven't been used much outside pure mathematics.  In this article we'll discuss how covering spaces can expand virtual worlds, offering a new solution to a fundamental problem with virtual reality.

### Our motivation, why covering spaces?

There is a fundamental problem with virtual worlds:

> We live in the real world and our rooms are small.

In the virtual world we can look out over great expanses, but walk forward 2 meters.  Ouch, the real world strikes.  The participant can only move within a room, and without some kind of trick the extent of that room determines the extent that the participant can explore the virtual world.  In Startrek no one ever explained how the holodeck overcomes this.  It bothered me as a child.

There is another reason why covering spaces are of interest; there is a huge variety and they would be a lot of fun.

### What are covering spaces?

We wont look at the mathematical definition here, but instead a shadow of it.
For our purposes the virtual world will be a covering space of a real world space.
So there will be our virtual world \\(\mathcal{V}\\), then there will be the real world space \\(\mathcal{R}\\), which will consist of a region where the participant can move inside the real world.
But then there will also be a map \\(\varphi\\), i.e. a function, which relates \\(\mathcal{V}\\) to \\(\mathcal{R}\\).  

$$\begin{align}
 \text{Virtual World} &\rightarrow \text{Real World} \\
 \varphi:\,\mathcal{V}\quad & \rightarrow \quad\mathcal{R}
\end{align}$$

For a point in the virtual world \\(P\\), the map tells us which point \\(\varphi(P)\\) the participant must be in the real world.

There is one property the covering space has to satisfy, the **path lifting property**.  This says that if the participant traces out a path \\(\gamma(t)\\) for \\(0\leq t\leq 1\\) through the real world \\(\mathcal{R}\\), then there must be a unique path through the virtual world, call it \\(\widehat{\gamma}(t)\\) such that \\(\phi(\widehat{\gamma}(t)) = \gamma(t)\\).  This is a precise way of saying:

> As the user moves through the real world, their path is determined through the virtual world.

So to recap, a covering space is a trio

$$(\mathcal{V}, \mathcal{R}, \varphi:\,\mathcal{V}\rightarrow\mathcal{R})$$

which satisfies the path lifting property.
In mathematics we call \\(\mathcal{V}\\) the *covering* space and \\(\mathcal{R}\\) the *base* space, but we will continue to use the terms *virtual* and *real*.

### An example

Let's consider an example, we will let \\(\mathcal{R}\\) be a circle minus the point in the center.
In polar coordinates a point can be represented by a pair \\((r, \theta)\\), where \\(0 < r \leq 1\\) and \\(0\leq \theta < 2\pi\\).  The virtual world in this case will be the points \\((r,\theta)\\), with \\(0<r\leq 1\\) as before, but where \\(\theta\\) is any real number.  The map \\(\varphi\\) sends \\(r\\) to \\(r\\) and \\(\theta\\) to the remainder of \\(\theta\\) divided by \\(2\pi\\).

{% include image_source.html url="/assets/spiral_staircase.jpg" description="A spiral staircase - " srcurl="https://commons.wikimedia.org/wiki/File:Spiral_staircase_in_Haldon_Belvedere.jpg" srcdesc="Image by Nilfanion - Wikimedia Commons" %}

As the participant moves around in the real world space we can keep track of the angle she makes with the center point, as she winds around the center the angle can increase beyond 2&pi;.  This means that although the room is finite, the virtual space could be arbitrarily large.

What would this look like in virtual reality?  Well suppose our virtual world consists of a single room with a pillar in the middle, this is much like \\(\mathcal{R}\\) above but with an added z-dimension.  Looking left round the pillar we would see a different point than if we looked to the right round the pillar.

{% include image_source.html url="/assets/griffin_pillar.png" description="Go left and find an eagle, go right and find a lion - " srcurl="https://pixabay.com/en/mythical-creature-griffin-151898/" srcdesc="Edited from clipart" %}

### Example - Asteroids&trade; vs Zelda: Link's Awakening&trade;

Consider the game asteroids, when the ship exits the screen on the right it reappears on the left, similarly if it leaves the bottom it will reappear at the top.  Mathematically the ship exists on a **torus** formed by identifying opposite pairs of edges.
Let's compare this with Zelda: Link's Awakening.  Similarly when our character Link leaves the screen on the right, he reappears on the left.  So in terms of screen-space the space Link resides in is the same space as Asteroids.  But it's not that simple, when Link leaves the screen on the right, he does reappear on the left, but now the screen displays the room to the right.
The full world Link is exploring
(you can find an image [here](http://www.zeldaelements.net/images/games/links_awakening/maps/worldmap.png))
is the plane that we are all used to, however in its implementation there's really a covering space.  The virtual world is a covering space of the screen.

### Representions of covering spaces

The example given in terms of polar coordinates is a good example of a covering space but most are not as simple to describe.  To understand a general technique for describing points of the configuration space we need to understand the covering map better.

A point in the covering space \\(q\in \mathcal{V}\\) can be described as a pair \\((p, l)\\) where \\(p = \varphi(q) \in \mathcal{R}\\) is a point in the base space, and \\(l\\) is a label which describes which point \\(q\\) is in the preimage

$$\varphi^{-1}(q) = \{s \in \mathcal{V} \mid \varphi(s) = q\}.$$

Now the challenge is to understand the set of labels for a given point \\(p\\) and then given a (typically short) path \\(\gamma\\) from \\(p\\) to \\(p'\\) inside \\(\mathcal{R}\\), understand how to change the label.

Let's look at an example, we will consider a square minus a point.  For each point \\(p\\) we will have the set of labels just equal to the set of whole numbers.
So a point in the virtual space is represented by a pair \\((p, n)\\) where \\(p\in \mathcal{R}\\) is a point in the square (and not the centre point), and \\(n\\) is an integer.
Now draw a line from the centre point to an outer edge, and call this line \\(L\\).  If a short path &gamma; joining \\(p\\) and \\(p'\\) does not cross \\(L\\) then moving along this path will not change the label.
So the lifted path joins \\((p, n)\\) to \\((p', n)\\).
However if the path passes through the line \\(L\\) in an anti-clockwise direction then increment the label by 1.  If it passes through \\(L\\) in a clockwise direction then increment it by minus 1.

{% include mouse_tracker.html width="400" height="400" %}

### The geometry of covering spaces

The path lifting property means that the local geometry of a covering space is identical to the local geometry of the base space, so there is no new local geometry.  In the context of virtual worlds we want to know how to render the virtual world, so we are interested in how light rays travel, i.e. in the geodesics.  By the path lifting property the geodesics (when they exist) are lifts of geodesics in the base space.  And since the real world has a Euclidean geometry these are just straight lines.
