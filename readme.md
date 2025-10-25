# Signals from outer space

## What is this?

this is a small implementation of signals that tries to go as faster as possible while remaining simpler. It uses single-linked lists (easier to maintain) to track dependencies and linearize them, by joining multiple lists together. effects are lazy evaluated, through a simple dirty check system