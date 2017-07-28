package org.cirmmp.webclientdyn.elfinder.controller.executor;

public interface CommandExecutor
{
	void execute(CommandExecutionContext commandExecutionContext)
			throws Exception;
}
