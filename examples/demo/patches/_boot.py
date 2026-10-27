"""Shared by every patch: where the harness and the prototype are."""
import os
import sys
HERE = os.path.dirname(os.path.abspath(__file__))
sys.path[:0] = [os.path.join(HERE, '..', '..', '..', 'harness'), HERE]
PROTO = os.path.join(HERE, '..', 'prototype.html')
