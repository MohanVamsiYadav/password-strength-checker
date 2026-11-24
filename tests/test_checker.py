import unittest
from password_checker import checks

class CheckerTests(unittest.TestCase):
    def test_empty(self):
        self.assertEqual(sum(checks("").values()), 0)
    def test_weak(self):
        self.assertEqual(sum(checks("hello123").values()), 2)
    def test_all_rules(self):
        self.assertTrue(all(checks("Example1234!").values()))
    def test_space_not_symbol(self):
        self.assertFalse(checks("Example 1234")["Special character"])
