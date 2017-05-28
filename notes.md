

Properties in the sprite:
> x, y
> v_x, v_y
> Image source
> width, height (both source and target)
> top_index (pixels down where the image begins)
> number_of_frames (number of frames for the amimation)
> on_ground
> ticks_per_frame (how long to sit on a frame - may be hardcoded)
> canvas, context

Functions in the sprite:
> render() - draw the sprite on screen
> move() - translate sprite x, y
> animate() - run sprite animation

Functions of Mario:
> key handlers!!

the loop:

(no key press)
1. render background
2. render foreground
3. check for collision flag
4.   if collision, follow the collision procedure
5. check for key press flag
     if key press, follow key press procedure
6. render hero
7. render monsters
8. check for key press (informs both motion and animation)
9. check for collision
10. update key press flag
11. update collision flag

(key press)


1. should you just run move() each time, but pass in a "key press" parameter?
2. or, should you only run move() when there's a key press?
3. render() should call both animate() and move().  There needs to be logic inside render()
4. do you pass the key handler flags into render(), or does render() get to do its own checking somehow?
5. if render() does its own checking, there needs to be a variable inside `sprite` to hold the state.

onKeyPress = move + animate
