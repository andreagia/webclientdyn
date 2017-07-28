package org.cirmmp.webclientdyn.elfinder.controller.executor;

public interface CommandExecutorFactory
{
	CommandExecutor get(String commandName);
}