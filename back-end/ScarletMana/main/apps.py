from typing import Any, Optional
from django.apps import AppConfig

import threading
import signal
import sys

from .game_loop import GameLoopThread

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'main'

    def ready(self) -> None:
        # print("READY", id(self))
        self.game_loop = GameLoopThread()
        self.game_loop.start()
        signal.signal(signal.SIGINT, self.stop_game_handler)
    
    def stop_game_handler(self, signum, frame):
        print("stop game!")
        self.game_loop.stop()
        sys.exit(0)