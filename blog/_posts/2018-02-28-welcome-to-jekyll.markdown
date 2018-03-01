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

As the participant moves around in the real world space we can keep track of the angle she makes with the center point, as she winds around the center the angle can increase beyond 2&pi;.  This means that although the room is finite, the virtual space could be arbitrarily large.

What would this look like?  Well suppose our virtual world consists of a single room with a pillar in the middle.  Looking left round the pillar we would see a different point than if we looked to the right round the pillar.

![An eagle and a lion, absolutely not a mythical creature!]({{ "/assets/griffin_pillar.png" | absolute_url }}){: width="50%" height="50%" class="img-responsive"}
